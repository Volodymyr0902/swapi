import * as process from "node:process";

export const IMAGES_PATH = `${process.cwd()}/src/data`

export const EXISTING_ENTITIES = ["person", "planet", "film", "specie", "starship", "vehicle"]

export const IMAGE_MIME_REGEX = /^image\/.*$/