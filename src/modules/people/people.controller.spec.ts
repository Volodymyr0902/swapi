import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { RelationsCompleterService } from '../../common/services/relations-completer.service';
import { RelationsToUrisInterceptor } from '../../common/interceptors/relations-to-uris.interceptor';
import { Person } from './entities/person.entity';
import { UpdatePersonDto } from './dto/update-person.dto';
import {
  mockCreatePersonReqDto,
  mockCreatePersonResDto,
  mockFindAllResDto,
  mockPaginationDto,
  mockUpdatePersonDto,
  mockRemovePersonResDto,
} from './mocks/raw-data.mocks';
import { GeneralResponseDto } from '../../common/dto/general-response.dto';

describe('PeopleController', () => {
  let controller: PeopleController;

  const mockPeopleService = {
    create: jest.fn((createPersonDto) => ({
      ...createPersonDto,
      ...mockCreatePersonResDto,
      id: 1,
    })),
    findAll: jest.fn((paginationDto) => mockFindAllResDto),
    findOne: jest.fn((id: number) => ({
      ...mockFindAllResDto[0],
      id,
    })),
    update: jest.fn((id: number, updatePersonDto: UpdatePersonDto) => ({
      ...mockFindAllResDto[0],
      ...updatePersonDto,
      id,
    })),
    remove: jest.fn((id: number): GeneralResponseDto => mockRemovePersonResDto),
  };
  const mockRelationsCompleterService = {};
  const mockRelationsToUrisInterceptor = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [PeopleService, RelationsCompleterService],
    })
      .overrideProvider(PeopleService)
      .useValue(mockPeopleService)
      .overrideProvider(RelationsCompleterService)
      .useValue(mockRelationsCompleterService)
      .overrideInterceptor(RelationsToUrisInterceptor)
      .useValue(mockRelationsToUrisInterceptor)
      .compile();

    controller = module.get<PeopleController>(PeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('post', () => {
    it('should create a new person', async () => {
      const savedPerson: Person = await controller.create(
        mockCreatePersonReqDto,
      );
      expect(savedPerson).toEqual({
        ...mockCreatePersonReqDto,
        ...mockCreatePersonResDto,
        id: expect.any(Number),
      });
      expect(mockPeopleService.create).toHaveBeenCalledWith(
        mockCreatePersonReqDto,
      );
    });
  });

  describe('get', () => {
    it('should get many people', async () => {
      const findAllResult = await controller.findAll(mockPaginationDto);
      expect(findAllResult).toEqual(mockFindAllResDto);
      expect(mockPeopleService.findAll).toHaveBeenCalledWith(mockPaginationDto);
    });

    it('should get one person by id', async () => {
      const findOneResult = await controller.findOne('1');
      expect(findOneResult).toEqual(mockFindAllResDto[0]);
      expect(mockPeopleService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('patch', () => {
    it('should update person partially', async (): Promise<void> => {
      const updatedResult: Person = await controller.update(
        '1',
        mockUpdatePersonDto,
      );
      expect(updatedResult).toEqual({
        ...mockFindAllResDto[0],
        ...mockUpdatePersonDto,
        id: 1,
      });
      expect(mockPeopleService.update).toHaveBeenCalledWith(
        1,
        mockUpdatePersonDto,
      );
    });
  });

  describe('delete', () => {
    it('should delete a person', async (): Promise<void> => {
      const removeResult: GeneralResponseDto = await controller.remove('1');
      expect(removeResult).toEqual(mockRemovePersonResDto);
      expect(mockPeopleService.remove).toHaveBeenCalledWith(1);
    });
  });
});
