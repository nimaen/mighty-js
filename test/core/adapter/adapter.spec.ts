import * as _ from 'lodash'
import * as chai from 'chai'
import {HeroData, Hero, IHero} from '../../mock/hero.data'
import {MockAdapter} from '../../mock/mock.adapter'
import {Resource} from '../../../src/core/resource/resource'
import {Request} from '../../../src/core/adapter/request'
import {IResponse} from '../../../src/core/adapter/response'

const expect = chai.expect
const heroData = new HeroData()
const adapter = new MockAdapter(heroData.db)
const heroResource = new Resource("heroes", Hero)

beforeEach(() => {
  adapter.heroes = [...heroData.db]
})

describe("Adapter", () => {
  it("should create data entry", (done) => {
    const numHeroes = adapter.heroes.length
    const request = new Request({data: heroData.deadpool})
    adapter.create(heroResource, request)
      .subscribe((response: IResponse) => {
        const hero = <IHero> response.data
        expect(_.omit(hero, ["id"])).to.deep.equal(_.omit(request.data, ["id"]))
        expect(adapter.heroes.length).to.equal(numHeroes + 1)
        done()
      })
  })
  
  it("should find a single result", (done) => {
    const criteria = (hero) => _.indexOf(hero.colors, "red") > -1
    const request = new Request({criteria: criteria})
    adapter.findOne(heroResource, request)
      .subscribe((response: IResponse) => {
        const hero = <IHero> response.data
        expect(hero).to.be.an("object")
        expect(hero).to.have.property("colors").that.contains("red")
        done()
      })
  })
  
  it("should find some results", (done) => {
    const criteria = (hero) => _.indexOf(hero.colors, "red") > -1
    const request = new Request({criteria: criteria})
    adapter.find(heroResource, request)
      .subscribe((response: IResponse) => {
        const heroes = <Array<IHero>> response.data
        expect(heroes).to.be.an("array").with.length.above(0)
        expect(heroes[0]).to.have.property("colors").that.contains("red")
        done()
      })
  })
  
  it("should save an entry", (done) => {
    const hero = _.cloneDeep(adapter.heroes[0])
    const criteria = {"name": hero.name}
    hero.name = "clark kent"
    const request = new Request({
      data: hero,
      criteria: criteria
    })
    adapter.save(heroResource, request)
      .subscribe((response: IResponse) => {
        const newHero = response.data
        expect(newHero).to.not.be.undefined
        expect(newHero).to.have.property("name").that.equal("clark kent")
        done()
      })
  })
  
  it("should destroy an entry", (done) => {
    const numHeroes = adapter.heroes.length
    const hero = _.cloneDeep(adapter.heroes[0])
    const criteria = {"name": hero.name}
    const request = new Request({criteria: criteria})
    adapter.destroy(heroResource, request)
      .subscribe((response: IResponse) => {
        const deletedHero = response.data
        expect(deletedHero).to.not.be.undefined
        expect(deletedHero).to.have.property("name").that.equal(hero.name)
        expect(adapter.heroes.length + 1).to.equal(numHeroes)
        done()
      })
  })
})
