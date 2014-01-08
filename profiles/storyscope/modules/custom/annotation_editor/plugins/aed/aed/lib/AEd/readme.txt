When you update tiny_mce editor you should add this code to tiny_mce.js:

search for if(p.initialized&&!p.destroyed) and replace whole if with this code (suggestion and annotation fragments destroying on page reload)

if(p.initialized&&!p.destroyed&&!p.isHidden()){

  if(AEd&&AEd.Annotations){

   for(var i=0;i<AEd.Annotations.annotations.length;i++){

     AEd.Fragments.destroyFragments(AEd.Annotations.annotations[i]);
   }

   AEd.SuggestionsMan.destroyAll();
   }

   p.save({format:"raw",no_events:true})
  }

single line code: 

if(p.initialized&&!p.destroyed&&!p.isHidden()){if(AEd&&AEd.Annotations){for(var i=0;i<AEd.Annotations.annotations.length;i++){AEd.Fragments.destroyFragments(AEd.Annotations.annotations[i]);}AEd.SuggestionsMan.destroyAll();}p.save({format:"raw",no_events:true})}
