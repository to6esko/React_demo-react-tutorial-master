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

render(<CommentBox data={data}/>, document.getElementById('content'));