import React from 'react'

export async function getProfie(userName){
 const resp = await fetch(`https://api.github.com/users/${userName}`);
 const profile = await resp.json();
 return profile;
}

export async function getProjects(userName){
    const resp = await fetch(`https://api.github.com/search/repositories?q=user:${userName}+fork:true&sort=updated&per_page=10&type=Repositories`);
    const projects = await resp.json();
    return projects;
   }