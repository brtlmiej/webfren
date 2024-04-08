# About

<br>
<br>
<br>
<div align="center">
  <img src="https://raw.githubusercontent.com/brtlmiej/webfren/master/assets/webfren.png" width="150">
  <p>
    <i><b>webfren</b> is a collection of tools helping developers create web applications much easier. All tools are available through webfren CLI.</i>
  <p>
</div>
<br>
<br>
<br>

## ✨ Features

✅ - Available &nbsp;&nbsp;&nbsp;&nbsp; 🔄 - In Development &nbsp;&nbsp;&nbsp;&nbsp; 📝 - Planned

- ✅ _HTTP Load tester_ - tool allowing to make stress and load test of API endpoints
- ✅ _Web Server_ - simulator of a real web server
- 🔄 _Load balancer_ - simulator of a load balancer
- 📝 _Message Broker_ - simulator of a Message Broker
- 📝 _Redis clone_ - clone of [Redis](https://redis.io/)

<br>

## 🚀 Getting started

Install __webfren__ globally:

```text
$ npm i -g webfren
```

And it will be ready to use in your terminal!

```text
$ webfren

               _      __                
 __      _____| |__  / _|_ __ ___ _ __  
 \ \ /\ / / _ \ '_ \| |_| '__/ _ \ '_ \ 
  \ V  V /  __/ |_) |  _| | |  __/ | | |
   \_/\_/ \___|_.__/|_| |_|  \___|_| |_|
                                        
Usage: webfren [options] [command]

Options:
  -V, --version                                output the version number
  -h, --help                                   display help for command

Commands:
  http-load-test <url> <n>                     executes HTTP load test
  load-balancer <port> <servers>               runs load balancer and handles requests to multiple servers
  web-server <port> <route> <contentFilePath>  runs web server and hosts provided html content
  help [command]  
```

<br>

## 📖 Docs

### http-load-test

Executes HTTP load test on specified endpoint. You can also provide number of requests (_n_) that will be sent to your endpoint. This tool can help to check locally if our app can handle multiple concurrent requests. Currently __webfren__ allows to sent only GET requests.

__Example__

Command

```text
$ webfren http-load-test https://example.com 100
```

Result

```text
               _      __                
 __      _____| |__  / _|_ __ ___ _ __  
 \ \ /\ / / _ \ '_ \| |_| '__/ _ \ '_ \ 
  \ V  V /  __/ |_) |  _| | |  __/ | | |
   \_/\_/ \___|_.__/|_| |_|  \___|_| |_|
                                        
Http Load Test is running...

Done!

Test stats:
   Num. of success requests: 100
   Num. of failed requests: 0
   Avg. response time: 0.01 ms
```

<br>

### load-balancer

Runs Load Balancer handling requests load to specified server addresses. This tool can help to check locally if our app will work correctly when load balancing mechanism will be introduced. Currently requests are sent ro randomly selected server.

__Example__

Command

```text
$ webfren load-balancer 9000 "https://example.com|https://example.test.com"
```

Result on user request on http://127.0.0.1:9000:

```text
               _      __                
 __      _____| |__  / _|_ __ ___ _ __  
 \ \ /\ / / _ \ '_ \| |_| '__/ _ \ '_ \ 
  \ V  V /  __/ |_) |  _| | |  __/ | | |
   \_/\_/ \___|_.__/|_| |_|  \___|_| |_|
                                        
Load Balancer is running:
   Port: 9000

Requests:
   Path: /               Redirected to: https://example.com/ Response: 200
```

<br>

### web-server

Runs Web Server allowing you to host selected html content. This tool can help when you would like to check locally how your HTML web page will be displayed by web server.

__Example__

Content of used html file:

```html
<h1>Hello</h1>
```

Command

```text
$ webfren web-server 8000 /home home.html 
```

Result on user request on http://127.0.0.1:8000/home:
```text
               _      __                
 __      _____| |__  / _|_ __ ___ _ __  
 \ \ /\ / / _ \ '_ \| |_| '__/ _ \ '_ \ 
  \ V  V /  __/ |_) |  _| | |  __/ | | |
   \_/\_/ \___|_.__/|_| |_|  \___|_| |_|
                                        
Web Server is running:
   Port: 8000

Requests:
   Path: /home           Response: 200 -> home.html
```

<br>

## 🚧 Roadmap

➡️&nbsp;&nbsp;&nbsp;01.03.2024 - 16.03.2024 - __HTTP Load Tester v1__

➡️&nbsp;&nbsp;&nbsp;16.03.2024 - 30.03.2024 - __Web Server v1__

&nbsp;&nbsp;&nbsp;➡️&nbsp;&nbsp;&nbsp;30.03.2024 - 08.04.2024 - __Load Balancer v1__

➡️&nbsp;&nbsp;&nbsp;08.04.2024 - 18.04.2024 - __HTTP Load Tester v2__

➡️&nbsp;&nbsp;&nbsp;18.04.2024 - 30.05.2024 - __Web Server v2__

➡️&nbsp;&nbsp;&nbsp;30.05.2024 - 12.05.2024 - __Load Balancer v2__

➡️&nbsp;&nbsp;&nbsp;12.05.2024 - 23.05.2024 - __HTTP Load Tester v3__

...

<br>
<hr>

<div align="center">Project created for <a href="https://100commitow.pl/" target="_blank">100commits</a> contest</div>
