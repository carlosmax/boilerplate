import { Hasher, HashComparer, Encrypter, Decrypter, RandomHexGenerator } from '@/data/protocols'

import { faker } from '@faker-js/faker'

export class HasherSpy implements Hasher {
  digest = faker.datatype.uuid()
  plaintext: string

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.digest
  }
}

export class HashComparerSpy implements HashComparer {
  plaintext: string
  digest: string
  isValid = true

  async compare(plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return this.isValid
  }
}

export class EncrypterSpy implements Encrypter {
  ciphertext = faker.datatype.uuid()
  plaintext: string

  async encrypt(plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.ciphertext
  }
}

export class DecrypterSpy implements Decrypter {
  plaintext = faker.internet.password()
  ciphertext: string

  async decrypt(ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext
    return this.plaintext
  }
}

export class RandomHexGeneratorSpy implements RandomHexGenerator {
  hex = faker.random.alphaNumeric(20)
  numBytes: number

  generate(numBytes: number): string {
    this.numBytes = numBytes
    return this.hex
  }
}
