
# 进入你需要copy的地址
cd /Users/chenxi/Desktop/Chen/form-designers
# 需要copy这个地址下面的那个文件夹 $1 就是 命令的第一个参数 距离 sh copy.sh 111 这个$1就是111
array_name=($1)
# 声明需要提交的变量  $2 就是  sh copy.sh 111 222 这个$2就是222 $0 是copy.sh
commit_msg=$2
# 判断是否存在$2 然后进行赋值
if [ ! $2 ];
then
    commit_msg="测试提交"
fi
# echo $commit_msg
# echo "My name is `basename $1` -I was called as $0"
# 循环 因为知道 只有几个文件 所以循环的是固定次数
for((i=0;i<=1;i++));
do 
cd  ./${array_name[$i]}
ls -l
# echo  ./${array_name[$i]} /Users/chenxi/Desktop/Chen/forever-zu 调试代码
# 然后复制到目标文件夹  如果只是做git提交是不需要这个循环的
cp -R ./${array_name[$i]} /Users/chenxi/Desktop/Chen/element_vue_learn/docs
done
# 跳转到目标文件 然后运行git命令 需要执行啥命令 直接写就完事
cd /Users/chenxi/Desktop/Chen/element_vue_learn
git add .

git commit  -m$commit_msg
git push
echo 执行结束