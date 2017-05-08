angular.module('pokeFightClub', ["ui.router"])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

$stateProvider
.state("home",{
    url: "/",
    templateUrl: "./../Home.html",
    controller: "control"
})
.state("pokedisco",{
    url: "/pokedisco",
    templateUrl: "/Views/PokeDisco.html",
    controller: "control"
})
.state("pokearena",{
    url: "/pokearena",
    templateUrl: "/Views/PokeArena.html",
    controller: "control"
})
.state("pokearena.pokemon",{
    url: "/pokemon",
    templateUrl: "/Views/Pokemon.html",
    controller: "control"
})

.state("pokearena.starwars",{
    url: "/starwars",
    templateUrl: "/Views/StarWars.html",
    controller: "control"
})

.state("pokearena.littlepony",{
    url: "/mylittlepony",
    templateUrl: "/Views/LittlePony.html",
    controller: "control"
})
$urlRouterProvider.otherwise("/")
}])


angular.module('pokeFightClub')
  .controller('control', ["$scope", "pokeService", "swapiService", "$timeout", function($scope, pokeService, swapiService, $timeout) {

    $scope.poke1;
    $scope.poke2;
    $scope.winner;
    $scope.fightDone = false;

    $scope.getStarWars = function() {
        swapiService.getStarWars()
        .then(function(response) {
          $scope.starWars = response.data.results;
          console.log($scope.starWars)
        });
      };

$scope.getStarData = function(url) {
    swapiService.getStarWars(url).then(function(response){
        $scope.starData = response.data
        console.log(response);
        })
}

    $scope.getPokemon = function() {
       pokeService.getPokemon()
        .then(function(response) {
          $scope.pokemon = response.data.results;
        });
      };
      $scope.getPokemon();
      
    $scope.setPoke1 = function(pokemon) {
      $scope.poke1 = pokemon;
      $scope.fightDone = false;
    };

    $scope.setPoke2 = function(pokemon) {
      $scope.poke2 = pokemon;
      $scope.fightDone = false;
      
    };

    $scope.fight = function() {
      if(!$scope.poke1 || !$scope.poke2 || $scope.poke1.name === $scope.poke2.name) {
        return alert('Fight command disabled. Two different opponents must be selected.');
      }

      var num = Math.floor(Math.random() * (2)) + 1;

      if (num === 1) {
        $scope.winner = $scope.poke1;
        $scope.enabled1 = true;
      } else {
        $scope.winner = $scope.poke2;
        $scope.enabled2 = true;
      }
      $scope.fightDone = true;
    };


$scope.get1Pics = function(pokeName) {
    pokeService.getPokemonPics(pokeName).then(function(response){
        $scope.enabled1=false;
        $scope.enabled2=false;
        $scope.pokePics1 = response.data.sprites.front_default
    })
}

$scope.get2Pics = function(pokeName) {
    pokeService.getPokemonPics(pokeName).then(function(response){
      
        $scope.enabled1=false;
        $scope.enabled2=false;
        $scope.pokePics2 = response.data.sprites.back_default
    })
}

$scope.getData = function(pokeName) {
    pokeService.getPokemonPics(pokeName).then(function(response){
        $scope.pokeData = response.data

var undies = {
  type: { name: "None" }
};

var undiez = {
  ability: { name: "None"}
};

if(response.data.types[1] === undefined){
   response.data.types[1] = undies;
  }
if(response.data.abilities[1] === undefined){
   response.data.abilities[1] = undiez;
  }
if(response.data.abilities[2] === undefined){
   response.data.abilities[2] = undiez;
  }
        console.log(response);
        
})
}

$(document).ready(function(){
  $(".pokehalo").mouseenter(function(){
      $timeout(function(){
      $(".campaign").css("visibility", "visible")
      $(".campaign").fadeIn(1000);
    },1500)
      $timeout(function(){
      $(".arena").css("visibility", "visible")
      $(".arena").fadeIn(1000);
    },2000)
      $timeout(function(){
      $(".disco").css("visibility", "visible")
      $(".disco").fadeIn(1000);
    },2200)
      $timeout(function(){
      $(".credits").css("visibility", "visible")
      $(".credits").fadeIn(1000);
    },2500)
  })
    $(".pokehalo").mouseleave(function(){
      $(".campaign").css("display", "none")
      $(".credits").css("display", "none")
      $(".disco").css("display", "none")
      $(".arena").css("display", "none")
  })
})


}]);
angular.module('pokeFightClub')
.directive('fightDir', ["$interval", function($interval){
    return{
        restrict: 'E',
        templateUrl: 'Views/FightButton.html',
        link: function(scope, elem, attrs){

            $(".fight-announce").on('mouseover', function(){        
                if(scope.poke1 && scope.poke2 && scope.poke1.name !== scope.poke2.name && scope.fightDone === false){
                    $(".fight-announce").addClass("fight-button-lit")
                    $(".fight-announce").removeClass('fight-button')
                }          
            })
            
            $(".fight-announce").on('click', function(){
                $(".fight-announce").removeClass('fight-button-lit');
                $(".fight-announce").addClass('fight-button');
            })
            
            
        }
    }
}])
angular.module('pokeFightClub')
.service('pokeService', ["$http", function($http){

this.getPokemon = function(){
return $http({
method: 'GET',
url: 'http://pokeapi.co/api/v2/pokemon/?limit=649'
});
};

// (Input 649 for all pokemon with front and back images)
// (Input 783 for all pokemon with back images)
// (Input 802 for all pokemon)

this.getPokemonPics = function(pokeName){
return $http({
method: 'GET',
url: 'http://pokeapi.co/api/v2/pokemon/'+pokeName
});
};
}]);
angular.module('pokeFightClub')
.service('swapiService', ["$http", function($http){

this.getStarWars = function(url) {
    return $http({
        method: 'GET',
        url: url || 'http://swapi.co/api/people/'
    });
};

}]);