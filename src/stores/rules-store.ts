import { defineStore } from 'pinia'
import { HouseRule, HouseRuleList } from 'src/types/house-rule'
import { useHouseRules } from 'src/services/house-roules'
import { AxiosError } from 'axios'
import { notify } from 'src/helpers/notify'

export const useRulesStore = defineStore('rules', {
  persist: true,
  state: () => ({
    rules: {} as HouseRuleList,
    loading: false
  }),
  getters: {
    list: (state) => state.rules.data ? state.rules.data.entities : [],
    isLoading: (state) => state.loading
  },
  actions: {
    async loadRules () {
      const houseRules = useHouseRules()
      this.loading = true
      try {
        const res = await houseRules._read()
        this.rules = res
      } catch (err) {
        if (err instanceof AxiosError) {
          notify('negative', err.message)
        }
        notify('negative', String(err) || 'We cannot get the records. Try again.')
      } finally {
        this.loading = false
      }
    },
    async createRule (payload: HouseRule) {
      const houseRules = useHouseRules()
      this.loading = true
      try {
        const res = await houseRules._create(payload)
        notify('positive', res.message)
        await this.loadRules()
      } catch (err) {
        if (err instanceof AxiosError) {
          notify('negative', err.message)
        }
        notify('negative', String(err) || 'We cannot save the record. Try again.')
      } finally {
        this.loading = false
      }
    },
    async editRule (payload: HouseRule) {
      const houseRules = useHouseRules()
      this.loading = true
      try {
        const res = await houseRules._update(payload)
        notify('positive', res.message)
        await this.loadRules()
      } catch (err) {
        if (err instanceof AxiosError) {
          notify('negative', err.message)
        }
        notify('negative', String(err) || 'We cannot edit the record. Try again.')
      } finally {
        this.loading = false
      }
    },
  },
});
