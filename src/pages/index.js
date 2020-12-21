import _ from 'lodash'
import { memo, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchAction } from '../store/actions'

import Layout from '../components/layout'
import Aside from '../components/aside'
import { LineContainer } from '../components/containers'
import { InputSearch } from '../components/input'
import { Title } from '../components/text'
import { ListHorizontal } from '../components/list'
import Album from '../components/album'

const infoList = (list) =>
  list.map((item) => {
    const id = item.artists[0].id
    const title = item.name
    const subtitle = item.artists[0].name
    const img = item.images[0].url

    const url_link = `/album/${id}`
    return (
      <Album
        title={title}
        subtitle={subtitle}
        img={img}
        url={url_link}
        imgSize={150}
        variant="text"
        pdgh={1}
        pdgv={1}
      />
    )
  })

function Home() {
  const dispatch = useDispatch()

  const listAlbums = useSelector((state) => state.albums.list)
  const searchText = useSelector((state) => state.albums.search)

  useEffect(() => {
    console.log(listAlbums)
  }, [listAlbums])

  const debounceQuery = _.debounce(
    (search) => dispatch(getSearchAction(search)),
    500
  )

  const handleChanged = useCallback(async (event) => {
    const value = event.target.value
    if (!value.length) return
    debounceQuery(value)
  }, [])

  return (
    <Layout title="Pesquise no Spotify !" aside={<Aside />}>
      <LineContainer>
        <InputSearch
          label="Busque por artistas, álbuns ou músicas"
          placeholder="Comece a escrever..."
          onChange={handleChanged}
        />
      </LineContainer>
      <LineContainer mgny={2}>
        {listAlbums.length ? (
          <>
            <Title
              text={`Resultados encontrados para "${searchText}"`}
              align="left"
            />
            <ListHorizontal
              space={2}
              list={infoList(listAlbums)}
              align="space-between"
            />
          </>
        ) : (
          <Title text="Nenhum resultado registrado" type="body1" />
        )}
      </LineContainer>
    </Layout>
  )
}

export default memo(Home)
