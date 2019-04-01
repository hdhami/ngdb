pid=$(netstat -a -o -n | grep 0.0.0.0:3000 | grep LISTENING | grep -o '[0-9]*$')
taskkill -F -PID  $pid