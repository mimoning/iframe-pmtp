## Introduction

`iframe-pmtp` is a tool library to make the communication between the iframe and your web app more easier. Its full name is `iframe postmessage transport protocol`.

### Install

```
npm install iframe-pmtp --save
```

### Usage

#### APIs:

| api | arguments | description |
|-----|-------------|-----------|
| `setTarget` | **window object** | set the default window that your request target to |
| `addListener` | `key` **string**, your listener token <br> `callback` **function**, your handler | add the listener to the message event |
| `request` | `key` **string**, your request token, determines the handler when the target recieved <br> `data` **object**, the data you want to send to the target among the request <br> `callback` **function (optional)**, the handler when the target response <br> `target` **window target (optional)**, the target your request want to send  <br> `origin` **string (optional, default: '*')**, the origin your request target should be | send the request to the target |
| `get` | `key` **string** <br> `callback` **function (optional)** <br> `target` **window object (optional)** <br> `origin` **string (optional, default: '*')** | a request without the data arguments |


#### Examples

Before you send some request to the window, you should add some listener to response the specified request.

```javascript
import pm from 'iframe-pmtp';

pm.addListener('key', (data, res) => {
  /* you logic */
  res(/* you response data */);
  // if you do not call the res function, the request will never response
});
```

If you want to send request to an iframe or a parent window, you should set your actually target in the `iframe-pmtp`.

```javascript
import pm from 'iframe-pmtp';

pm.setTarget(/* you target window object*/);
pm.request('key', { data }, res => {
  /* your response logic */
});
```
or

```javascript
import pm from 'iframe-pmtp';

pm.request('key', { data }, res => {
  /* your response logic */
}, targetWindow);
```

If you just want to get some data from the target and no data sent, you should use the `get` function

```javascript
import pm from 'iframe-pmtp';

pm.get('key', res => {
  /* your response logic */
}, targetWindow);
```
