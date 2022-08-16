

cd /Users/chenxi/Desktop/Chen/form-designers
array_name=($1)
# commit_msg = $2?$2:"测试提交"
commit_msg=$2
if [ ! $2 ];
then
    commit_msg="测试提交"
fi
echo $commit_msg
# echo "My name is `basename $1` -I was called as $0"
for((i=0;i<=1;i++));
do 
cd  ./${array_name[$i]}
ls -l
# echo  ./${array_name[$i]} /Users/chenxi/Desktop/Chen/forever-zu
cp -R ./${array_name[$i]} /Users/chenxi/Desktop/Chen/element_vue_learn/docs
done
cd /Users/chenxi/Desktop/Chen/element_vue_learn
git add .

git commit  -m$commit_msg
git push
echo 执行结束