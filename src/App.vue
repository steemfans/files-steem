<template>
  <div id="app">
    <el-row type="flex" justify="center" :gutter="20">
      <el-col :xs="{span: 24}" :sm="{span: 20}" :md="{span: 16}" :lg="{span: 12}" style="padding: 0 30px;">
        <el-row>
          <el-col :span="24">
            <h1>{{ sitename }}</h1>
          </el-col>
        </el-row>
        <FileBox></FileBox>
        <ReadMe></ReadMe>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FileBox from '@/components/FileBox';
import ReadMe from '@/components/ReadMe';

export default {
  name: 'App',
  data() {
    return {
      sitename: 'Steem Data Server',
    };
  },
  components: {
    FileBox,
    ReadMe,
  },
}
</script>

<style>
h1, h2 {
  color: #444;
}
</style>
