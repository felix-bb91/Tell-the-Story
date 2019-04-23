import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";


const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class UploadButton extends React.Component{

    constructor(){
        super();
        this.state = {
            uploading: false,
            updatedProfile: null,
        };

    }

    uploadPicture = () => {
        this.props.uploadPicture(this.state.updatedProfile);
    }



    handleChange = async e => {
        const filesToUpload = e.target.files;
        this.setState({ uploading: true,});
        const updatedProfile = await this.uploadFiles(filesToUpload);
        this.setState({ uploading: false, updatedProfile});
        this.uploadPicture();
    };

    uploadFiles = async(files) => {
        const formData = this.buildFormData(files);
        return await this.postDataFetch(formData);
    }

    buildFormData = file => {
        const formData = new FormData()
        //console.log(file);
        formData.append('img', file[0])
        return formData;
    }

    postDataFetch = async formData => {

        this.setState({ uploading: true });
        var token = sessionStorage.getItem('token');

        const res = await fetch('http://localhost:3000/myProfile/editProfile', {
            method: 'POST',
            body: formData,
            headers:{
                'token': token,
            }
        })
        const updatedProfile = await res.json(); //Parseo de la respuesta del fecth y ojo que .json no es síncrono a diferencia de JSON.parse(body);
        //console.log(updatedProfile);
        return updatedProfile.updatedProfile; // Ojo si no lo pones, en uploadFile el return tendrá un undefined

    }


    render(){
  
        const { classes } = this.props;
        
        return (
            <div>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={this.handleChange}
            />
            <label htmlFor="contained-button-file">
                <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    className={classes.button}
                >
                    Editar imagen de perfil
                    <CloudUploadIcon className={classes.rightIcon} />
                </Button>
            </label>
            </div>
        );
    }
}

UploadButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UploadButton);