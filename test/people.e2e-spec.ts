import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { PeopleModule } from '../src/modules/people/people.module';
import { RelationsCompleterService } from '../src/common/services/relations-completer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Person } from '../src/modules/people/entities/person.entity';
import { RelationsToUrisInterceptor } from '../src/common/interceptors/relations-to-uris.interceptor';
import {
  mockCreatePersonReqDto,
  mockCreatePersonResDto,
  mockFindAllResDto,
  mockRemovePersonResDto,
  mockUpdatePersonDto,
} from '../src/modules/people/mocks/raw-data.mocks';
import { JwtService } from '@nestjs/jwt';
import { JwtAccessAuthGuard } from '../src/modules/auth/guards/jwt-access-auth.guard';
import { RolesGuard } from '../src/modules/roles/guards/roles.guard';

describe('PeopleController (e2e)', () => {
  let app: INestApplication<App>;

  const mockRelationsToUrisInterceptor = {};
  const mockJwtService = {};
  const mockJwtAccessAuthGuard = {};
  const mockRolesGuard = {};

  const mockRelationsCompleterService = {
    forCreate: jest.fn().mockImplementation((createPersonDto) =>
      Promise.resolve({
        ...createPersonDto,
        ...mockCreatePersonResDto,
      }),
    ),
    forUpdate: jest.fn().mockImplementation((id, updatePersonDto) =>
      Promise.resolve({
        ...mockFindAllResDto[0],
        ...updatePersonDto,
        id,
      }),
    ),
  };

  const mockPersonRepository = {
    save: jest.fn().mockImplementation((person) => Promise.resolve(person)),
    find: jest.fn().mockResolvedValue(mockFindAllResDto),
    findOneOrFail: jest.fn().mockResolvedValue(mockFindAllResDto[0]),
    existsBy: jest.fn().mockResolvedValue(true),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    metadata: {
      relations: [
        { propertyName: 'films' },
        { propertyName: 'species' },
        { propertyName: 'starships' },
      ],
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PeopleModule],
    })
      .overrideProvider(RelationsCompleterService)
      .useValue(mockRelationsCompleterService)
      .overrideProvider(getRepositoryToken(Person))
      .useValue(mockPersonRepository)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .overrideInterceptor(RelationsToUrisInterceptor)
      .useValue(mockRelationsToUrisInterceptor)
      .overrideGuard(JwtAccessAuthGuard)
      .useValue(mockJwtAccessAuthGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockRolesGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/people').expect(200).expect({
      data: mockFindAllResDto,
    });
  });

  it('/:id (GET)', () => {
    return request(app.getHttpServer()).get('/people/1').expect(200).expect({
      data: mockFindAllResDto[0],
    });
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/people')
      .send(mockCreatePersonReqDto)
      .expect(201)
      .expect({
        data: mockCreatePersonResDto,
      });
  });

  it('/ (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/people/1')
      .send(mockUpdatePersonDto)
      .expect(200)
      .expect({
        data: {
          ...mockFindAllResDto[0],
          ...mockUpdatePersonDto,
        },
      });
  });

  it('/ (DELETE)', () => {
    return request(app.getHttpServer()).delete('/people/1').expect(200).expect({
      data: mockRemovePersonResDto,
    });
  });
});
