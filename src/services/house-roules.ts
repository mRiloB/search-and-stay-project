import { HouseRule, HouseRuleList, HouseRuleCreate } from './../types/house-rule'
import { api } from 'boot/axios'
import { useUserStore } from 'stores/user-store'

export function useHouseRules () {
  const userStore = useUserStore()
  const headers = {
    'Authorization': `Bearer ${userStore.token}`
  }

  async function _create (payload: HouseRule) {
    const { data } = await api.post<HouseRuleCreate>('/house_rules', { house_rules: payload }, { headers })
    return data
  }

  async function _read () {
    const { data } = await api.get<HouseRuleList>('/house_rules', { headers })
    return data
  }

  async function _update (payload: HouseRule) {
    const { data } = await api.put<HouseRuleCreate>('/house_rules/'.concat(String(payload.id)), { house_rules: payload }, { headers })
    return data
  }

  async function _delete (id: number) {
    const { data } = await api.delete<HouseRuleCreate>('/house_rules/'.concat(String(id)), { headers })
    return data
  }

  async function _show (id: number) {
    const { data } = await api.get<HouseRuleCreate>('/house_rules/'.concat(String(id)), { headers })
    return data
  }

  return { _create, _read, _update, _delete, _show }
}
