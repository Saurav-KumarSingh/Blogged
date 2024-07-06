import conf from '../conf/config';
import { Client, ID, Storage, Query, Databases } from 'appwrite';

export class Service{
    client= new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket= new Storage(this.client);
    }
    async createPost({title,slug,content,featuredImage}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDbId,conf.appWriteCollectionId, slug,{
                    title,content,featuredImage,status,userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error ",error)
        }
    }
    async updatePost(slug,{title,featuredImage,content,status}){
        try {
           return await this.databases.updateDocument(conf.appWriteDbId,conf.appWriteCollectionId,slug,{
            title,content,featuredImage,status
           })
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error ",error)
        }
    }
    async deletePost(slug){
        try {
           await this.databases.deleteDocument(conf.appWriteDbId,conf.appWriteCollectionId,slug)
           return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error ",error)
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDbId,conf.appWriteCollectionId,slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
            return false;
        }
    }
    async getPosts(queries= [Query.equal('status','active')]){
        try {
            return await this.databases.listDocuments(conf.appWriteDbId,
                conf.appWriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getAllPost :: error",error);
            return false
        }
    }

    //file upload services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appWriteBucketId,
                ID.unique(),
                file)
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error);
            return false
        }
    }
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(conf.appWriteBucketId,
                fileId)
                return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error",error);
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appWriteBucketId,fileId)
    }

}

const service= new Service();

export default service;