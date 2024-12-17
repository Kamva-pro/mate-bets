import React from "react";


// import "./style.css";

export const BetSelect = () => {
  return (
    <div id="webcrumbs"> 
                	<div className="w-[800px] min-h-[600px] shadow-lg rounded-lg flex">  {/* Sidebar */}
    	  <aside className="w-[200px] bg-primary-700 text-white p-5 flex flex-col space-y-8">
    	    {/* Branding */}
    	    <div className="flex items-center">
    	      <i className="material-symbols-outlined text-white">anchor</i>
    	      <span className="ml-2 font-title text-lg">BRAND</span>
    	    </div>
    	    {/* Menu Items */}
    	    <nav className="flex flex-col space-y-3">
    	      <a href="#" className="flex items-center space-x-3">
    	        <i className="material-symbols-outlined">home</i>
    	        <span>Home</span>
    	      </a>
    	      <a href="#" className="flex items-center space-x-3 bg-primary-800 rounded-md p-2">
    	        <i className="material-symbols-outlined">dashboard</i>
    	        <span>dashboard</span>
    	      </a>
    	      <a href="#" className="flex items-center space-x-3">
    	        <i className="material-symbols-outlined">folder</i>
    	        <span>Upload</span>
    	      </a>
    	      <a href="#" className="flex items-center space-x-3">
    	        <i className="material-symbols-outlined">photo_library</i>
    	        <span>Media</span>
    	        <i className="material-symbols-outlined ml-auto">expand_more</i>
    	      </a>
    	      <a href="#" className="flex items-center space-x-3">
    	        <i className="material-symbols-outlined">group</i>
    	        <span>Users</span>
    	        <i className="material-symbols-outlined ml-auto">expand_more</i>
    	      </a>
    	      <a href="#" className="flex items-center space-x-3">
    	        <i className="material-symbols-outlined">payments</i>
    	        <span>Payments</span>
    	        <i className="material-symbols-outlined ml-auto">expand_more</i>
    	      </a>
    	      <a href="#" className="flex items-center space-x-3">
    	        <i className="material-symbols-outlined">settings</i>
    	        <span>Settings</span>
    	      </a>
    	    </nav>
    	  </aside>
    	
    	  {/* Main content */}
    	  <main className="flex-1 bg-primary-900 text-white flex flex-col">
    	    {/* Header */}
    	    <header className="bg-primary-700 text-white p-4 flex items-center justify-between">
    	      <h1 className="font-title text-xl">Dashboard</h1>
    	      <i className="material-symbols-outlined text-white">menu</i>
    	    </header>
    	    {/* Content area */}
    	    <section className="p-5 flex flex-col space-y-4">
    	      <div className="h-[60px] bg-primary-800 rounded-md"></div>
    	      <div className="h-[60px] bg-primary-800 rounded-md"></div>
    	      <div className="h-[60px] bg-primary-800 rounded-md"></div>
    	      <div className="h-[60px] bg-primary-800 rounded-md"></div>
    	    </section>
    	  </main>
    	</div> 
                </div>
  )
}

