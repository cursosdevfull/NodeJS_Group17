let listConstraints: string[] = [];

const setDefault = () => {
  listConstraints = [];
};

const ExtractValueProperties = (obj: unknown, property: string) => {
  if (typeof obj === "object" && Array.isArray(obj)) {
    obj.forEach((el) => {
      ExtractValueProperties(el, property);
    });
  } else if (typeof obj === "object") {
    if (obj.hasOwnProperty("constraints")) {
      listConstraints.push(
        (obj as any)["constraints"][Object.keys((obj as any)["constraints"])[0]]
      );
    }

    Object.keys(obj).forEach((el) =>
      ExtractValueProperties((obj as any)[el], property)
    );
  }
};

export { listConstraints, ExtractValueProperties, setDefault };
