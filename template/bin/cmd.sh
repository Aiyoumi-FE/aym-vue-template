#!/bin/sh

BASE=`pwd`
cmd=$1
value=$2

logfile=bin/node.`date +%s`.log

#1 git pull
# git pull

#package check
python bin/precheck.py

#2 调用nodejs 并保存临时文件
node build/build.js $cmd $value --env=production | tee $logfile

#检查nodejs的返回结果
if grep "exec error:" $logfile
then
echo -e "\033[31m Node task [$cmd $value] fail! Please check and try again! \033[0m"
else
echo -e "\033[32m Node task [$cmd $value] success! \033[0m"
#  3 scp

fi

#删除临时文件
rm $logfile

