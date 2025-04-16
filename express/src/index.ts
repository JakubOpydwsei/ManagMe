import express, { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import 'dotenv/config'

type User = {
  id: number
  login: string
  password: string
  name: string
  surname: string
  role: 'admin' | 'devops' | 'developer'
}

const users: User[] = [
  {
    id: 1,
    login: 'admin',
    password: 'zaq12wsx',
    name: 'Jan',
    surname: 'Kowalski',
    role: 'admin',
  },
  {
    id: 2,
    login: 'dev',
    password: 'devpass',
    name: 'Anna',
    surname: 'Nowak',
    role: 'developer',
  },
]

const app = express()
const port = 3000

const tokenSecret = process.env.TOKEN_SECRET || 'default'
const refreshTokens: Record<string, User> = {}

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World - simple api with JWT!')
})

app.post('/token', (req: Request, res: Response) => {
  const { expTime = 60, login, password } = req.body

  const user = users.find(u => u.login === login && u.password === password)

  if (!user) {
    return res.status(401).send({ message: 'Invalid login or password' })
  }

  const token = generateToken(+expTime, user)
  const refreshToken = generateToken(60 * 60)
  refreshTokens[refreshToken] = user

  return res.status(200).json({ token, refreshToken })
})

app.post('/refreshToken', (req: Request, res: Response) => {
  const { refreshToken: refreshTokenFromPost } = req.body

  const user = refreshTokens[refreshTokenFromPost]
  if (!user) {
    return res.status(400).send('Invalid refresh token!')
  }

  const token = generateToken(60, user)
  const newRefreshToken = generateToken(60 * 60)

  refreshTokens[newRefreshToken] = user
  delete refreshTokens[refreshTokenFromPost]

  return res.status(200).json({ token, refreshToken: newRefreshToken })
})

app.get('/protected', verifyToken, (req: Request & { user?: Omit<User, 'password'> }, res: Response) => {
  return res.status(200).json({ user: req.user })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})


function generateToken(expirationInSeconds: number, user?: Omit<User, 'password'>): string {
  const exp = Math.floor(Date.now() / 1000) + expirationInSeconds
  const payload = user ? { exp, user } : { exp }
  return jwt.sign(payload, tokenSecret, { algorithm: 'HS256' })
}


function verifyToken(req: Request & { user?: Omit<User, 'password'> }, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (!token) return res.sendStatus(403)

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send(err.message)
    }

    if (typeof decoded === 'object' && 'user' in decoded) {
      req.user = decoded.user
      next()
    } else {
      return res.status(401).send('Invalid token payload')
    }
  })
}
