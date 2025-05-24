import * as yaml from 'js-yaml';
import {readFileSync} from "fs"
import {join} from "path"
import * as process from "node:process";
import {EnvVars} from "../common/types/env-vars.type";
import {CONFIG_FILE_NAME} from "../common/constants";

export default () => {
    return yaml.load(
        readFileSync(join(process.cwd(), CONFIG_FILE_NAME), 'utf8')
    ) as EnvVars;
}