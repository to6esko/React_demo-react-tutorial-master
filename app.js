
/*
"use strict";
import React from 'react';
import {
    render
}
from 'react-dom';



class CommentBox extends React.Component {
    constructor() {
        super();
    }

    getInitialState() {
        return { data: [] };
    }
    
    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInrerval);
    }


    render() {
        return (
            <div className='commentBox'>
                <h1>Comments</h1>
                <CommentList data={this.props.data}/>
                <CommentForm/>
                Hello, world !
            </div>
        );
    }
};

class CommentList extends React.Component {
    constructor() {
        super();
    }
    render() {
        let commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment  author = { comment.author }  key = { comment.id } >
                    { comment.text }
                </Comment>
            );
        });

        return (
            <div  className = "commentList" >
                { commentNodes }
            </div>
        );
    }

};


class CommentForm extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className='commentForm'>
            </div>
        );
    }
};

class Comment extends React.Component {
    constructor() {
        super();
    }
    rawMarkup() {
        var rawMarkup = marked(this.props.children.toString(),
            { sanitize: true });
        return { __html: rawMarkup }
    }
    render() {
        return (
            <div className='comment'>
                <h3 className='commentAuthor'>
                    {this.props.author}
                </h3>
                <span dangerouslySetInnerHTML={this.rawMarkup() }/>
            </div>
        );
    }
};

var data = [
    { id: 1, author: 'Todor Krasev', text: 'This is a comment.' },
    { id: 2, author: 'Penka Penkova', text: 'This is a comment too.' }
]

render(<CommentBox url="/api/comments" pollInrerval={2000}/>, document.getElementById('content'));
*/



"use strict";
import React from 'react';
import {
    render
}
from 'react-dom';


class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = { data: [] };
    }



    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({ data: data });
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    handleCommentSubmit(comment) {
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({ data: newComments });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'Post',
            data: comment,
            success: (data) => {
                this.setState({ data: data });
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }


    getInitialState() {
        return { data: [] };
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInrerval);
    }

    render() {
        return (
            <div className='commentBox'>
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this) }/>
                Hello, world !
            </div>
        );
    }
};



class CommentList extends React.Component {
    constructor() {
        super();
    }

    render() {
        let commentNodes = this.props.data.map((comment) => {
            return (
                <Comment  author = { comment.author }  key = { comment.id } >
                    { comment.text }
                </Comment>
            );
        });

        return (
            <div  className = "commentList" >
                { commentNodes }
            </div>
        );
    }

};



class CommentForm extends React.Component {
    constructor() {
        super();
    }
    getInitialState() {
        return { author: '', text: '' };
    }
    handleSubmit(event) {
        event.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ author: author, text: text });
        this.setState({ author: '', text: '' });
    }
    handleAuthorChange(event) {
        this.setState({ author: event.target.value });
    }

    handleTextChange(event) {
        this.setState({ text: event.target.value });
    }

    render() {
        return (
            <form className='commentForm' onSubmit={this.handleSubmit.bind(this) } >
                <input className='your-name' type='text' placeholder='Your name' value={this.props.author} onChange={this.handleAuthorChange.bind(this) }/>
                <textarea className='form-control' type='text' placeholder='Say something...' value={this.props.text} onChange={this.handleTextChange.bind(this) }/>
                <input className='btn-submit' type='submit' value='Post'/>
            </form>
        );
    }
};


class Comment extends React.Component {
    constructor() {
        super();
    }
    rawMarkup() {
        var rawMarkup = marked(this.props.children.toString(),
            { sanitize: true });
        return { __html: rawMarkup }
    }
    render() {
        return (
            <div className='comment'>
                <h3 className='commentAuthor'>
                    {this.props.author}
                </h3>
                <span dangerouslySetInnerHTML={this.rawMarkup() }/>
            </div>
        );
    }
};



render(<CommentBox url="/api/comments" pollInrerval={10000}/>, document.getElementById('content'));