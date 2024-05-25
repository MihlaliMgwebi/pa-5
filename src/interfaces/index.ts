export const listingPostBody = {
    apikey: '',
    type: 'GetAllListings',
    limit: 10, // Default value
    sort: 'id', // Default value
    order: 'ASC', // Default value
    fuzzy: false, // Default value
    search: {
      location: '',
      type: 'ale', // Default value
    },
    return: ['*'], // Default value
  };