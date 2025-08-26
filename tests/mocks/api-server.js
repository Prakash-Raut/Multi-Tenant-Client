const http = require('http');
const url = require('url');

const port = process.env.MOCK_API_PORT ? Number(process.env.MOCK_API_PORT) : 4001;

/**
 * Very small mock API to satisfy SSR fetches during e2e.
 */
const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url || '', true);

  // CORS for safety
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && parsed.pathname === '/api/auth/tenants') {
    const responseBody = {
      data: [
        {
          id: 'tenant-1',
          name: 'Demo Pizza',
        },
      ],
    };
    const body = JSON.stringify(responseBody);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(body);
    return;
  }

  if (req.method === 'GET' && parsed.pathname === '/api/catalog/categories') {
    const categories = [
      {
        _id: 'cat-margherita',
        name: 'Margherita',
        priceConfiguration: {},
        attributes: [],
      },
      {
        _id: 'cat-pepperoni',
        name: 'Pepperoni',
        priceConfiguration: {},
        attributes: [],
      },
    ];
    const body = JSON.stringify(categories);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(body);
    return;
  }

  if (req.method === 'GET' && parsed.pathname === '/api/catalog/products') {
    const products = {
      data: [
        {
          _id: 'prod-1',
          name: 'Classic Margherita',
          description: 'Tomato, mozzarella, basil',
          image: '/pizza.jpg',
          priceConfiguration: {},
          attributes: [],
          tenantId: 'tenant-1',
          categoryId: 'cat-margherita',
          category: {
            _id: 'cat-margherita',
            name: 'Margherita',
            priceConfiguration: {},
            attributes: [],
          },
          isPublish: true,
        },
        {
          _id: 'prod-2',
          name: 'Spicy Pepperoni',
          description: 'Pepperoni and cheese',
          image: '/pizza.jpg',
          priceConfiguration: {},
          attributes: [],
          tenantId: 'tenant-1',
          categoryId: 'cat-pepperoni',
          category: {
            _id: 'cat-pepperoni',
            name: 'Pepperoni',
            priceConfiguration: {},
            attributes: [],
          },
          isPublish: true,
        },
      ],
    };
    const body = JSON.stringify(products);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(body);
    return;
  }

  if (req.method === 'GET' && parsed.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }

  // default 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(port, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Mock API server listening on http://localhost:${port}`);
});


