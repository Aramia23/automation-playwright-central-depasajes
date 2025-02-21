
  const schema = {
    type: 'object',
        properties: {
          homeworld:{ type: 'string' },
          created: { type: 'string' },
          url: { type: 'number' },
          name: { type: 'string' },
     },
  }

  const data = {
    description: "Luke Skywalker",
    message_ok: "ok",
    error_message_404: "not found"
  };

  
export {
  data,
  schema
};
