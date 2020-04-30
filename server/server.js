const Koa = require('koa');
const app = new Koa();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
const port = 3000;

const player = {
     name1: '',
     name2: ''
}

server.listen(process.env.PORT || port, () => {
     console.log(`app run at : http://172.25.1.62:${port}`);
})

io.on('connection', socket => {
     console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
     socket.on('login', data => {
          if(!player.name1) {
               player.name1 = data;
               socket.emit("getUserInfo", player);
          }
          else if(!player.name2) {
               player.name2 = data;
               socket.emit("getUserInfo", player);
          }
          console.log('客户端发送的内容：', data);
     })
     socket.on("isFill", data => {
          console.log('isFill', player.name1, player.name2)
          socket.emit('hasFill', player.name1 && player.name2 ? true : false)
     })
     socket.on("getUser", () => {
          console.log('getUser')
          io.sockets.emit('getUserInfo', player)
     })
     socket.on("go", (i, j, nowPlayer) => {
          console.log('go')
          io.sockets.emit('next', i, j, nowPlayer)
     })
     socket.on("logout", (data) => {
          console.log('退出', data)
          if(player.name1 === data) player.name1 = '';
          else if(player.name2 === data) player.name2 = '';
     })
     
})