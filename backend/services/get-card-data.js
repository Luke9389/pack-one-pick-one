// eslint-disable-next-line no-undef
module.exports = (layout, data) => {
  console.log(data.name);
  if(layout === 'transform') {
    return {
      'id': data.id,
      'name': data.name,
      'image_uri': `${data.card_faces[0].image_uris.png} // ${data.card_faces[1].image_uris.png}`,
      'cmc': data.cmc,
      'type_line': data.type_line,
      'colors': `${data.card_faces[0].colors.length ? data.card_faces[0].colors.join() : 'C'} // ${data.card_faces[1].colors.length ? data.card_faces[1].colors.join() : 'C'}`,
      'color_identity': data.color_identity.length ? data.color_identity.join() : 'C',
      'expansion': data.set,
      'rarity': data.rarity
    };
  }
  return {
    'id': data.id,
    'name': data.name,
    'image_uri': data.image_uris.png,
    'cmc': data.cmc,
    'type_line': data.type_line,
    'colors': data.colors.length ? data.colors.join() : 'C',
    'color_identity': data.color_identity.length ? data.color_identity.join() : 'C',
    'expansion': data.set,
    'rarity': data.rarity
  };
};
