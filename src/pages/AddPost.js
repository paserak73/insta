/**
 * Created by Petr on 16.2.2017.
 */
import React, { Component } from 'react'
import Navigation from '../components/Navigation'
import Photo from 'react-icons/lib/md/add-a-photo'
import { connect } from 'react-redux';
import { addPost } from '../actions/postActions'



export default class AddPost extends Component{
    constructor(props){
        super(props)
        this.state = {
            file: '',
            imagePreviewUrl: false,
            description: ''
        };

        this._handleDescriptionChange = this._handleDescriptionChange.bind(this)
    }

    _handleImageChange(e){
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file)
    }

    _handleDescriptionChange(event){
        this.setState({description: event.target.value});
    }

    _handleSubmit(){

        let user = JSON.parse(sessionStorage.getItem('user')) || {};
        let data = {
            ownerName: user.name,
            ownerImage: user.picture.data.url,
            image: this.state.imagePreviewUrl,
            title: this.state.description,
            likeCount: 0
        };
        this.props.dispatch(addPost(data))
        this.props.router.push('/')
    }

    render(){
        let image;
        if(this.state.imagePreviewUrl){
            image = <img className="imagePreview" alt="postImg" src={this.state.imagePreviewUrl} />
        }else{
            image = <Photo/>
        }
        return(
            <div>
                <Navigation />
                <div className="contentAddPost">
                    <div className="addPostWrap">
                        <textarea value={this.state.description} onChange={this._handleDescriptionChange} placeholder="popisek" className="description" cols="30" rows="3" />
                        <input type="file" className="inputImage" onChange={(e)=>this._handleImageChange(e)}/>
                        <div className="imageWrap">
                            {image}
                        </div>
                        <div className="btnWrap">
                            <button className="btn" onClick={()=>this._handleSubmit()}>Odeslat</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = connect()(AddPost)


