import { Test, TestingModule } from '@nestjs/testing';
import { PeopleService } from './people.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import {
  mockCreatePersonReqDto,
  mockCreatePersonResDto,
  mockFindAllResDto,
  mockPaginationDto,
  mockRemovePersonResDto,
  mockUpdatePersonDto,
} from './mocks/raw-data.mocks';
import { GeneralResponseDto } from '../../common/dto/general-response.dto';

describe('PeopleService', () => {
  let service: PeopleService;

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

  const mockRelationsCompleterService = {
    forCreate: jest.fn().mockImplementation((createPersonDto) =>
      Promise.resolve({
        ...createPersonDto,
        ...mockCreatePersonResDto,
        id: 1,
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: getRepositoryToken(Person),
          useValue: mockPersonRepository,
        },
        RelationsCompleterService,
      ],
    })
      .overrideProvider(RelationsCompleterService)
      .useValue(mockRelationsCompleterService)
      .compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new person', async () => {
    const createResult = await service.create(mockCreatePersonReqDto);
    expect(createResult).toEqual({
      ...mockCreatePersonReqDto,
      ...mockCreatePersonResDto,
      id: expect.any(Number),
    });
  });

  it('should get many people', async () => {
    const findAllResult = await service.findAll(mockPaginationDto);
    expect(findAllResult).toEqual(mockFindAllResDto);
  });

  it('should get one person by id', async () => {
    const findOneResult = await service.findOne(1);
    expect(findOneResult).toEqual({
      ...mockFindAllResDto[0],
      id: 1,
    });
  });

  it('should update person partially', async () => {
    const updateResult = await service.update(1, mockUpdatePersonDto);
    expect(updateResult).toEqual({
      ...mockFindAllResDto[0],
      ...updateResult,
      id: 1,
    });
  });

  it('should delete a person', async () => {
    const removeResult: GeneralResponseDto = await service.remove(1);
    expect(removeResult).toEqual(mockRemovePersonResDto);
  });
});
