# 自动发布脚本
## tips: ${}里面是替换字符串，$()里面是替换命令

echo "--> step1：开始更新版本号"
# 1、版本号更新
## 传入参数指定版本号
if [ "$1" ];
then
  npm --no-git-tag-version version --allow-same-version $1
  VERSION=$1
elif [ "$1" != "&&" ];
## 版本号加1
then
  npm --no-git-tag-version version --allow-same-version patch
  VERSION=$(node -p "require('./package.json').version")
fi
NAME=$(node -p "require('./package.json').name")

# 2、提交git记录
echo "-> step2：提交git记录(v${VERSION})"
git commit -am "docs(.): publish version ${VERSION}"

# 3、标记tag
TAG_NAME=v${VERSION}
echo "-> step3：标记tag（${TAG_NAME}）"
git tag -d ${TAG_NAME} 2>/dev/null
git tag ${TAG_NAME}
echo step3

# 5、生成changelog
echo "-> step4：生成changelog"
conventional-changelog -p angular -i CHANGELOG.md -s -r 0
git commit -am "docs(CHANGELOG.md): update changelog" # (新增提交，避免重写提交覆盖tag)

# 发布库
echo "-> step5：发布 https://registry.npmjs.org/"
ADDRESS=https://registry.npmjs.org/
npm unpublish ${NAME}@${VERSION} 2>/dev/null --registry=${ADDRESS}
npm publish --registry=${ADDRESS}

echo "-> step6:推送远程git分支"
git push origin
git push origin --tags

echo "🎉 发布成功 🎉"
printf "tag: ${TAG_NAME}.\n"
printf "version: ${VERSION}.\n"
echo ""

