import { Registry } from "react-registry";
import { Arguments } from "react-registry/dist/util/Arguments";
import { StyledComponent } from "../types";

class ComponentRegistry {
  static get<T>(componentRegistryId: string, params?: Arguments) {
    let getParams: any = {
      id: componentRegistryId,
      conditions: { id: componentRegistryId }
    };
    if (params && params.isValid()) {
      getParams = {
        ...getParams,
        conditions: { ...getParams.conditions, ...params.conditions },
        ...params
      };
    }
    const component = Registry.get(getParams) as StyledComponent<T>;
    if (!component) {
      // eslint-disable-next-line no-console
      console.error(
        `There is no component registered with name ${componentRegistryId}`
      );
    }

    return component;
  }

  static register<T>(
    component: StyledComponent<T>,
    componentRegistryId: string,
    params?: Arguments
  ) {
    let registerParams: any = {
      id: componentRegistryId,
      conditions: { id: componentRegistryId }
    };
    if (params && params.isValid()) {
      registerParams = {
        ...registerParams,
        conditions: { ...registerParams.conditions, ...params.conditions },
        ...params
      };
    }
    Registry.register(component, registerParams);
  }
}

export default ComponentRegistry;
