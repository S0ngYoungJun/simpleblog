// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB 연결
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2', { useNewUrlParser: true, useUnifiedTopology: true });

// 블로그 글 모델 정의
const BlogPost = mongoose.model('post', {
  title: String,
  content: String,
});


// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// 블로그 글 목록 조회
app.get('/', async (req, res) => {
  const blogPosts = await BlogPost.find();
  res.render('index', { blogPosts });
});

// 글 작성 폼 렌더링
app.get('/new', (req, res) => {
  res.render('new');
});

// 글 작성 요청 처리
app.post('/new', async (req, res) => {
  const { title, content } = req.body;
  const blogPost = new BlogPost({ title, content });
  await blogPost.save();
  res.redirect('/');
});

// 글 수정 폼 렌더링
app.get('/edit/:id', async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id);
  res.render('edit', { blogPost });
});

// 글 수정 요청 처리
app.post('/edit/:id', async (req, res) => {
  const { title, content } = req.body;
  await BlogPost.findByIdAndUpdate(req.params.id, { title, content });
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});