import React from 'react';
import recipesImg from './images/recipes-bg.jpg';

const SideAd = () => (
    <div style={{ 
        height: '100vh', 
        backgroundImage: `url(${recipesImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center'
    }}>
    <div className="text-center text-white">
    <h3>The Ultimate</h3>
    <h1 className="display-3" >Recipes App</h1>
    </div>
    </div>
);

export default SideAd;