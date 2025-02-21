const schema = {
    type: 'object',
        properties: {
          description:{ type: 'string' },
          created: { type: 'string' },
          population: { type: 'string' },
          climate: { type: 'string' },
     },
  }

const data = {
  description: "Tatooine",
  message_ok: "ok",
  error_message_404: "Not found"
};


export {
data,
schema
};
