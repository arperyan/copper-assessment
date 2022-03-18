# frontend-test-assesment
[Layouts in Figma](https://www.figma.com/file/PIMH4eZlYJ0FCBqo8fAfwG/Test?node-id=0%3A1)

Create an order table component with mock server data. Keep in mind that some of the components of the table may be used in other components later i.e. design them as re-usable. To create the frontend part, you can use whatever you like in the React stack, the only exception being the mandatory use of [redux-toolkit](https://redux-toolkit.js.org/).

Currencies icons are available from the Copper public cdn, example [BTC icon](https://cdn.copper.co/static/currencies/btc.svg)

#### Mock server:
Runs at `localhost:3002` check your `/etc/hosts` file in case of troubles.

##### Api requests:
`get /api/currencies-info` - returns a currency dictionary with USD rate\
`get /api/orders` - returns a list of orders

###### Approve/Reject
`patch /api/orders/:orderId` with a custom header\
`Content-Type: application/vnd.approve-order+json` - for approve\
`Content-Type: application/vnd.reject-order+json` - for reject

###### Bulk approve/reject
`patch /api/orders` with a custom header and `orderIds` array in body\
`Content-Type: application/vnd.bulk-approve-order+json` - for approve\
`Content-Type: application/vnd.bulk-reject-order+json` - for reject\
Request body should contain an array of orderIds for approve/reject: `{orderIds: ['1', '2', ...]}`