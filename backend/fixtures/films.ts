
  const schema = {
      type: 'object',
          properties: {
            starships:{ type: 'object' },
            created: { type: 'string' },
            episode_id: { type: 'number' },
            director: { type: 'string' },
       },
    }

  const data = {
    description: "A Star Wars Film",
    message_ok: "ok",
    error_message_404: "Film not found"
  };

  
export {
  data,
  schema
};
