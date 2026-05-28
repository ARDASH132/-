import { MODEL_CATALOG } from "./catalog.js";

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function pickModel(type, size = null) {
  let variants = MODEL_CATALOG.filter((model) => model.type === type);

  if (size) {
    variants = variants.filter((model) => model.size === size);
  }

  if (variants.length === 0) {
    throw new Error(`No model found for type: ${type}`);
  }

  return pickRandom(variants);
}

export function generateScene(userChoice) {
  const scene = [];

  const scale = userChoice.scale || "small";

  const factorySize = scale === "large" ? "large" : "small";

  const factory = pickModel("factory", factorySize);

  scene.push({
    type: "factory",
    model: factory.id,
    x: 0,
    z: 0,
    rotation: 0
  });

  scene.push({
    type: "road",
    model: pickModel("road").id,
    x: 0,
    z: -25,
    rotation: 0
  });

  scene.push({
    type: "warehouse",
    model: pickModel("warehouse").id,
    x: 35,
    z: 0,
    rotation: 0
  });

  scene.push({
    type: "parking",
    model: pickModel("parking").id,
    x: -25,
    z: -10,
    rotation: 0
  });

  if (userChoice.needHousing) {
    scene.push({
      type: "housing",
      model: pickModel("housing").id,
      x: -60,
      z: 35,
      rotation: 0
    });
  }

  scene.push({
    type: "green",
    model: pickModel("green").id,
    x: -40,
    z: 20,
    rotation: 0
  });

  return scene;
}