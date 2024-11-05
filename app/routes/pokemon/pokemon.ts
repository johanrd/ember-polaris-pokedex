import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type { ModelFrom } from 'ember-polaris-pokedex/utils/ember-route-template';
import type ApplicationRoute from 'ember-polaris-pokedex/routes/application';
import type Transition from '@ember/routing/transition';
import type RouterService from '@ember/routing/router-service';

export default class PokemonRoute extends Route {
  @service declare router: RouterService;

  queryParams = {
    groupBy: {},
  };

  model(params: { pokemon_id: string }, transition: Transition) {
    // perform a query param validation
    // eslint-disable-next-line
    if (!['day', 'week'].includes(transition?.to?.queryParams?.['groupBy'] as string)
    ) {
      // visit http://localhost:4200/pokemon/1?groupBy=month and see error:
      // TypeError: Cannot read properties of undefined (reading 'name')
      this.router.replaceWith({ queryParams: { groupBy: 'day' } });
    }
    return {
      pokemonRequest: (
        this.modelFor('application') as ModelFrom<ApplicationRoute>
      ).pokemonRequest,
      id: params.pokemon_id,
    };
  }
}
