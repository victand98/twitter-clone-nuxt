import mitt from "mitt";

const emitter = mitt();

export default function useEmmiter() {
  return {
    $on: emitter.on,
    $emit: emitter.emit,
  };
}
