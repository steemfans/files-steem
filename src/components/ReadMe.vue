<template>
  <el-row>
    <el-col :span="24">
        <VueShowdown :markdown="readme" class="markdown-body" />
    </el-col>
  </el-row>
</template>
<script>
import readme from '@/markdown/README.md';

export default {
  name: 'ReadMe',
  data() {
    return {
      readme,
    };
  },
}
</script>

<style>
.markdown-body table {
  border-collapse: collapse;
  border-spacing: 0;
  margin-bottom: 16px;
  margin-top: 0;
  display: block;
  overflow: auto;
  width: 100%;
}
.markdown-body td,
.markdown-body th {
  padding: 0;
}
.markdown-body table th {
  font-weight: 600;
}
.markdown-body table td,
.markdown-body table th {
  border: 1px solid #dfe2e5;
  padding: 6px 13px;
}
.markdown-body table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}
.markdown-body table tr:nth-child(2n) {
  background-color: #f6f8fa;
}
.markdown-body pre {
  word-wrap: normal;
  margin-bottom: 16px;
  margin-top: 0;
  font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
}
.markdown-body pre>code {
  background: transparent;
  border: 0;
  font-size: 100%;
  margin: 0;
  padding: 0;
  white-space: pre;
  word-break: normal;
}
.markdown-body .highlight {
  margin-bottom: 16px;
}
.markdown-body .highlight pre {
  margin-bottom: 0;
  word-break: normal;
}
.markdown-body .highlight pre,
.markdown-body pre {
  background-color: #f6f8fa;
  border-radius: 3px;
  font-size: 85%;
  line-height: 1.45;
  overflow: auto;
  padding: 16px;
}
.markdown-body pre code {
  background-color: transparent;
  border: 0;
  display: inline;
  line-height: inherit;
  margin: 0;
  max-width: auto;
  overflow: visible;
  padding: 0;
  word-wrap: normal;
}
</style>