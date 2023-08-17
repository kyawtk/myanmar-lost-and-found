export const generateItemDoc = (values , imageAsset, foundOrLost)=>{
    const doc = {
        _type: foundOrLost === "found" ? "foundItem" : "lostItem",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        title: values.title,
        description: values.description,
        location: { region: values.region },
        contact: { tel: values.tel, email: values.email },
        date: values.date,
        category:values.category,
      };
      return doc;
}