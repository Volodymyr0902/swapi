import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateVehicleDto} from './dto/create-vehicle.dto';
import {UpdateVehicleDto} from './dto/update-vehicle.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Vehicle} from "./entities/vehicle.entity";
import {Repository} from "typeorm";
import {PaginationDto} from "../../common/dto/pagination.dto";
import {RelationsCompleterService} from "../../common/services/relations-completer.service";
import {GeneralResponseDto} from "../../common/dto/general-response.dto";

@Injectable()
export class VehiclesService {
    constructor(@InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
                private readonly relationsCompleter: RelationsCompleterService<Vehicle>,) {}

    async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
        const newVehicle: Vehicle = await this.relationsCompleter.forCreate(createVehicleDto, Vehicle);
        return this.vehicleRepository.save(newVehicle);
    }

    findAll(paginationDto: PaginationDto): Promise<Vehicle[]> {
        const {page, limit} = paginationDto;
        const skip: number = page * limit - limit;

        return this.vehicleRepository.find({
            skip,
            take: limit,
            relations: this.vehicleRepository.metadata.relations.map(rel => rel.propertyName),
        });
    }

    findOne(id: number): Promise<Vehicle> {
        return this.vehicleRepository.findOneOrFail({
            where: {id},
            relations: this.vehicleRepository.metadata.relations.map(rel => rel.propertyName),
        });
    }

    async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
        const completedVehicle: Vehicle = await this.relationsCompleter.forUpdate(id, updateVehicleDto, Vehicle);
        return this.vehicleRepository.save(completedVehicle)
    }

    async remove(id: number): Promise<GeneralResponseDto> {
        if (!(await this.vehicleRepository.existsBy({id}))) {
            throw new NotFoundException(`Vehicle with id ${id} not found`);
        }

        const {affected} = await this.vehicleRepository.delete(id);
        return {success: !!affected};
    }
}
