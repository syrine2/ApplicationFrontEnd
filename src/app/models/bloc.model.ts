import { Rubrique } from "./rubrique.model";
import { Version } from "./version.model";

export class Bloc {
        id?: any ;
        nom?: string ;
        libelle?: string;
        descriptions?: string;
        rubriques?: [Rubrique] ;
        version?: Version;
}
