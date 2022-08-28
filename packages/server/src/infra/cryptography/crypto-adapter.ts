import { RandomHexGenerator } from '@/data/protocols'
import crypto from 'crypto'

export class CryptoAdapter implements RandomHexGenerator {
  generate(numBytes: number): string {
    return crypto.randomBytes(numBytes).toString('hex')
  }
}
