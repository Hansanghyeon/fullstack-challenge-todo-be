import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () =>
    request(app.getHttpServer()).get('/').expect(200).expect('Hello World!'))

  describe('/cookies (GET)', () => {
    it('should return all provided cookies', () =>
      request(app.getHttpServer())
        .get('/cookies')
        .set('Cookie', 'awesome=cookie')
        .expect(200)
        .expect({
          awesome: 'cookie',
        }))
  })
})
