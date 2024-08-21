/**
 * Engine
 *
 * @author tangjiahui
 * @date 2024/8/21
 */
import Api from './api';
import Component from './component';
import Config from './config';
import Hook from './hook';
import JsonNode from './jsonNode';

class Engine {
  api = new Api();
  component = new Component();
  config = new Config();
  hook = new Hook();
  jsonNode = new JsonNode();
}

const engine = new Engine();
export default engine;
