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
let refreshToken: string | null = null

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

  // 👇 Zmieniamy nazwę zmiennej, żeby nie było konfliktu
  const {password: _, ...userWithoutPassword } = user

  const token = generateToken(+expTime, userWithoutPassword)
  refreshToken = generateToken(60 * 60)

  return res.status(200).json({ token, refreshToken })


})

app.post('/refreshToken', (req: Request, res: Response) => {
  const refreshTokenFromPost = req.body.refreshToken

  if (!refreshToken || refreshToken !== refreshTokenFromPost) {
    return res.status(400).send('Invalid refresh token!')
  }

  const expTime = +(req.headers.exp || 60)
  const token = generateToken(expTime)
  refreshToken = generateToken(60 * 60)

  setTimeout(() => {
    res.status(200).json({ token, refreshToken })
  }, 3000)
})

app.get('/protected', verifyToken, (req: Request & { user?: Omit<User, 'password'> }, res: Response) => {
  if (!req.user) {
    return res.status(403).send('User not found in token')
  }

  return res.status(200).json({ user: req.user })
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

// -------------------------
// 🔐 Generowanie tokena

function generateToken(expirationInSeconds: number, user?: Omit<User, 'password'>): string {
  const exp = Math.floor(Date.now() / 1000) + expirationInSeconds
  const payload = {
    exp,
    user,
  }
  return jwt.sign(payload, tokenSecret, { algorithm: 'HS256' })
}


interface JwtPayload {
  exp: number
  user: Omit<User, 'password'>
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (!token) return res.sendStatus(403)

  jwt.verify(token, tokenSecret, (err, decoded) => {
    if (err) {
      console.error('JWT Error:', err.message)
      return res.status(401).send(err.message)
    }

    (req as Request & { user?: JwtPayload['user'] }).user = (decoded as JwtPayload).user
    next()
  })
}

