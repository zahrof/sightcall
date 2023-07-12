import {Data} from "./data.model";
import {Links} from "./links.model";
import {Meta} from "./meta.model";

export interface Appointments {
  data: Data[];
  links: Links;
  meta: Meta
}
