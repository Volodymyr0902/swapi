import {Injectable} from '@nestjs/common';
import {CreateVehicleDto} from './dto/create-vehicle.dto';
import {UpdateVehicleDto} from './dto/update-vehicle.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Vehicle} from "./entities/vehicle.entity";
import {Repository} from "typeorm";
import {PaginationDto} from "../common/dto/pagination.dto";
import {RelationsCompleterService} from "../common/services/relations-completer.service";

@Injectable()
export class VehiclesService {
    constructor(@InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
                private readonly relationsCompleter: RelationsCompleterService<Vehicle>,) {
    }

    async create(createVehicleDto: CreateVehicleDto) {
        const newVehicle = await this.relationsCompleter.forCreate(createVehicleDto, Vehicle);
        return this.vehicleRepository.save(newVehicle);
    }

    findAll(paginationDto: PaginationDto) {
        const {page, limit} = paginationDto;
        const skip = page * limit - limit;

        return this.vehicleRepository.find({
            skip,
            take: limit,
            relations: this.vehicleRepository.metadata.relations.map(rel => rel.propertyName)
        });
    }

    findOne(id: number) {
        return this.vehicleRepository.findOne({
            where: {id},
            relations: this.vehicleRepository.metadata.relations.map(rel => rel.propertyName)
        });
    }

    async update(id: number, updateVehicleDto: UpdateVehicleDto) {
        const completedVehicle = await this.relationsCompleter.forUpdate(id, updateVehicleDto, Vehicle);
        return this.vehicleRepository.save(completedVehicle)
    }

    remove(id: number) {
        return this.vehicleRepository.delete(id);
    }
}
